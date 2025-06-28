from flask import jsonify
from models.package_model import Package
from bson import ObjectId
from mongoengine.errors import ValidationError, DoesNotExist

# Controller to add a new package
def add_package_controller(data):
    required = ["name", "destination", "duration", "pricePerPerson", "features"]
    # Check for missing required fields
    if not all(field in data for field in required):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        # Create and save the new package
        pkg = Package(**data)
        pkg.save()
        return jsonify({"message": "Package created", "id": str(pkg.id)}), 201
    except ValidationError as e:
        # Handle validation errors
        return jsonify({"error": str(e)}), 400

# Controller to get all packages, ordered by destination
def get_all_packages_controller():
    packages = Package.objects().order_by("destination")
    # Serialize package data for response
    result = [
        {
            "id": str(p.id),
            "name": p.name,
            "destination": p.destination,
            "duration": p.duration,
            "pricePerPerson": p.pricePerPerson,
            "features": p.features
        }
        for p in packages
    ]
    return jsonify(result), 200

# Controller to get a package by its ID
def get_package_by_id_controller(package_id):
    try:
        # Attempt to find the package by ID
        pkg = Package.objects.get(id=ObjectId(package_id))
        return jsonify({
            "id": str(pkg.id),
            "name": pkg.name,
            "destination": pkg.destination,
            "duration": pkg.duration,
            "pricePerPerson": pkg.pricePerPerson,
            "features": pkg.features,
        }), 200
    except DoesNotExist:
        # Handle case where package is not found
        return jsonify({"error": "Package not found"}), 404
    except:
        # Handle invalid ID format
        return jsonify({"error": "Invalid package ID"}), 400

# Controller to delete a package by its ID
def delete_package_controller(package_id):
    try:
        # Attempt to delete the package by ID
        result = Package.objects(id=ObjectId(package_id)).delete()
        if result == 0:
            # No package found to delete
            return jsonify({"error": "Package not found"}), 404
        return jsonify({"message": "Package deleted"}), 200
    except:
        # Handle invalid ID format
        return jsonify({"error": "Invalid package ID"}), 400
