from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from bson.objectid import ObjectId
from datetime import datetime
from pydantic import ValidationError
from app import mongo
from models.user_model import UserModel

user_bp = Blueprint('user', __name__)

@user_bp.route('/user', methods=['GET'])
def get_users():
    users = mongo.db.users.find()
    response = []
    for user in users:
        user['_id'] = str(user['_id'])
        response.append(user)
    return jsonify(response), 200

@user_bp.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
    user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
    if user:
        user['_id'] = str(user['_id'])
        return jsonify(user), 200
    else:
        return jsonify({"error": "User not found"}), 404

@user_bp.route('/user', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        user_data = UserModel(**data)
    except ValidationError as e:
        return jsonify(e.errors()), 400

    hashed_password = generate_password_hash(user_data.password)
    
    user = {
        'username': user_data.username,
        'email': user_data.email,
        'password': hashed_password,
        'first_name': user_data.first_name,
        'last_name': user_data.last_name,
        'created_at': datetime.utcnow(),
        'updated_at': datetime.utcnow()
    }

    user_id = mongo.db.users.insert_one(user).inserted_id
    new_user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
    new_user['_id'] = str(new_user['_id'])
    return jsonify(new_user), 201

@user_bp.route('/user/<user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = request.get_json()
        user_data = UserModel(**data)
    except ValidationError as e:
        return jsonify(e.errors()), 400

    update_data = {
        'username': user_data.username,
        'email': user_data.email,
        'first_name': user_data.first_name,
        'last_name': user_data.last_name,
        'updated_at': datetime.utcnow()
    }
    if 'password' in data:
        update_data['password'] = generate_password_hash(user_data.password)

    updated_user = mongo.db.users.find_one_and_update(
        {'_id': ObjectId(user_id)},
        {'$set': update_data},
        return_document=True
    )
    if updated_user:
        updated_user['_id'] = str(updated_user['_id'])
        return jsonify(updated_user), 200
    else:
        return jsonify({"error": "User not found"}), 404

@user_bp.route('/user/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    result = mongo.db.users.delete_one({'_id': ObjectId(user_id)})
    if result.deleted_count > 0:
        return jsonify({"message": "User deleted"}), 200
    else:
        return jsonify({"error": "User not found"}), 404
