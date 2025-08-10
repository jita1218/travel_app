from flask import Blueprint, request, jsonify
import requests
import os
from config import Config

# Get the OpenTripMap API key from config
opentrip_api_key = Config.OPENTRIPMAP_API_KEY

# Raise an error if the API key is missing
if not opentrip_api_key:
    raise ValueError("Missing OPENTRIPMAP_API_KEY in environment variables")

# Create a Flask Blueprint for destination routes
destination_bp = Blueprint("destination", __name__, url_prefix="/api/destination")

@destination_bp.route("/popular", methods=["GET"])
def get_popular_destinations():
    """
    Endpoint to get popular destinations (POIs) for a given region.
    """
    region = request.args.get("region")
    if not region:
        return jsonify({"error": "Region is required"}), 400

    # Get latitude and longitude for the region
    geo_url = f"https://api.opentripmap.com/0.1/en/places/geoname?name={region}&apikey={opentrip_api_key}"
    geo_resp = requests.get(geo_url)
    if geo_resp.status_code != 200:
        return jsonify({"error": "Failed to fetch geolocation"}), 500

    geo = geo_resp.json()
    lat, lon = geo.get("lat"), geo.get("lon")
    if not lat or not lon:
        return jsonify({"error": "Invalid location data received"}), 400

    # Fetch popular POIs
    poi_url = f"https://api.opentripmap.com/0.1/en/places/radius?radius=40000&lon={lon}&lat={lat}&rate=2&format=json&limit=30&apikey={opentrip_api_key}"
    poi_resp = requests.get(poi_url)
    if poi_resp.status_code != 200:
        return jsonify({"error": "Failed to fetch POIs"}), 500

    pois = poi_resp.json()
    results = []

    # Fetch POI details
    for poi in pois:
        xid = poi.get("xid")
        if not xid:
            continue

        details_url = f"https://api.opentripmap.com/0.1/en/places/xid/{xid}?apikey={opentrip_api_key}"
        detail_resp = requests.get(details_url)
        if detail_resp.status_code != 200:
            continue

        details = detail_resp.json()
        image_url = details.get("preview", {}).get("source")

        results.append({
            "name": details.get("name"),
            "image": image_url
        })

    return jsonify({"pois": results})

@destination_bp.route("/hotels", methods=["GET"])
def get_hotels():
    """
    Endpoint to get hotels/accommodations for a given region.
    """
    region = request.args.get("region")
    if not region:
        return jsonify({"error": "Region is required"}), 400

    # Get latitude and longitude for the region
    geo_url = f"https://api.opentripmap.com/0.1/en/places/geoname?name={region}&apikey={opentrip_api_key}"
    geo_resp = requests.get(geo_url)
    if geo_resp.status_code != 200:
        return jsonify({"error": "Failed to fetch geolocation"}), 500

    geo = geo_resp.json()
    lat, lon = geo.get("lat"), geo.get("lon")
    if not lat or not lon:
        return jsonify({"error": "Invalid location data received"}), 400

    # Fetch accommodations
    hotel_url = f"https://api.opentripmap.com/0.1/en/places/radius?radius=10000&lon={lon}&lat={lat}&kinds=accomodations&format=json&limit=10&apikey={opentrip_api_key}"
    hotel_resp = requests.get(hotel_url)
    hotels = []
    if hotel_resp.status_code == 200:
        hotel_data = hotel_resp.json()
        for hotel in hotel_data:
            xid = hotel.get("xid")
            if not xid:
                continue

            detail_url = f"https://api.opentripmap.com/0.1/en/places/xid/{xid}?apikey={opentrip_api_key}"
            hotel_detail_resp = requests.get(detail_url)
            if hotel_detail_resp.status_code != 200:
                continue

            hotel_details = hotel_detail_resp.json()
            image_url = hotel_details.get("preview", {}).get("source") or "https://via.placeholder.com/300x200?text=No+Image"

            hotels.append({
                "name": hotel_details.get("name"),
                "image": image_url,
                "address": hotel_details.get("address", {}).get("formatted")
            })

    return jsonify({"hotels": hotels})
