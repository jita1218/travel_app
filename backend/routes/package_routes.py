from flask import Blueprint, request, jsonify
from flask_pymongo import PyMongo
from bson import ObjectId
from config import Config
from pymongo import MongoClient
import os


mongo = MongoClient(Config.MONGO_URI)
db = mongo.get_default_database()

package_bp = Blueprint("package", __name__, url_prefix="/api/packages")

@package_bp.route("/", methods=["GET"])
def get_all_packages():
    #Fetch all packages from the database.
    print("Fetching all packages")
    packages = list(db.packages.find())
    for pkg in packages:
        pkg["_id"] = str(pkg["_id"])  
    return jsonify(packages)

@package_bp.route("/<string:package_id>", methods=["GET"])
def get_package(package_id):
    #Fetch a single package by ID and calculate total price based on number of people.
    num_people = int(request.args.get("num_people", 1))
    package = db.packages.find_one({"_id": ObjectId(package_id)})
    if not package:
        return jsonify({"error": "Package not found"}), 404
    package["_id"] = str(package["_id"])
    total_price = package["pricePerPerson"] * num_people
    package["totalPrice"] = total_price
    package["numPeople"] = num_people
    return jsonify(package)

@package_bp.route("/", methods=["POST"])
def add_package():
    #Add a new package to the database.
    print("Adding new package")
    data = request.get_json()
    required_fields = ["name", "destination", "duration", "pricePerPerson", "features"]
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    # Insert the new package into the database
    result = db.packages.insert_one({
        "name": data["name"],
        "destination": data["destination"],
        "duration": data["duration"],
        "pricePerPerson": data["pricePerPerson"],
        "features": data["features"],
    })

    return jsonify({"message": "Package created", "id": str(result.inserted_id)}), 201

@package_bp.route("/<string:package_id>", methods=["DELETE"])
def delete_package(package_id):
    #Delete a package by its ID.
    print(f"Deleting package with ID: {package_id}")
    result = db.packages.delete_one({"_id": ObjectId(package_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Package not found"}), 404
    return jsonify({"message": "Package deleted"})
