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
destination_bp = Blueprint("destination", __name__)

@destination_bp.route("/popular", methods=["GET"])
def get_popular_destinations():
    # Get the 'region' parameter from the query string
    region = request.args.get("region")
    if not region:
        return jsonify({"error": "Region is required"}), 400

    # Get latitude and longitude for the specified region using OpenTripMap geoname API
    geo_url = f"https://api.opentripmap.com/0.1/en/places/geoname?name={region}&apikey={opentrip_api_key}"
    geo_resp = requests.get(geo_url)
    if geo_resp.status_code != 200:
        return jsonify({"error": "Failed to fetch geolocation"}), 500

    geo = geo_resp.json()
    lat, lon = geo.get("lat"), geo.get("lon")
    if not lat or not lon:
        return jsonify({"error": "Invalid location data received"}), 400

    # Fetch nearby Points of Interest (POIs) within a 40km radius
    poi_url = f"https://api.opentripmap.com/0.1/en/places/radius?radius=40000&lon={lon}&lat={lat}&rate=2&format=json&limit=30&apikey={opentrip_api_key}"
    poi_resp = requests.get(poi_url)
    if poi_resp.status_code != 200:
        return jsonify({"error": "Failed to fetch POIs"}), 500

    pois = poi_resp.json()
    results = []

    # For each POI, fetch detailed information including image and description
    for poi in pois:
        xid = poi.get("xid")
        if not xid:
            continue

        # Fetch POI details using its xid
        details_url = f"https://api.opentripmap.com/0.1/en/places/xid/{xid}?apikey={opentrip_api_key}"
        detail_resp = requests.get(details_url)
        if detail_resp.status_code != 200:
            continue

        details = detail_resp.json()

        # Append relevant details to the results list
        results.append({
            "name": details.get("name"),
            "image": details.get("preview", {}).get("source"),
            "description": details.get("wikipedia_extracts", {}).get("text"),
        })

    # Return the list of popular destinations as JSON
    return jsonify(results)
