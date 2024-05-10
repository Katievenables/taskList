from flask import Flask, jsonify, request
from  flask_cors import CORS

# CRUD
# CREATE
# READ
# UPDATE
# DELETE

# database
tasks = [
    {"id": 1, "title": "Task 1", "done": False},
    {"id": 2, "title": "Task 2", "done": False},
]

app = Flask(__name__) 
CORS(app)
CORS(app, origins=['http://localhost:3000'])


@app.route("/")
def hello_world():
    return "<p>Hello World!</p>"


@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/task/<int:id>', methods=['GET'])
def get_task(id):
    for task in tasks:
        if id == task["id"]:
            return jsonify(task)


@app.route('/task', methods=['POST'])
def create_task():
     new_task =  {"id": len(tasks) + 1, "title": request.json["title"], "done": False}
     tasks.append(new_task)
     return jsonify({"task": new_task}), 201

    
@app.route('/task/<int:id>', methods=['PUT'])
def update_task(id):
    for task in tasks:
        if id == task["id"]:
            if "done" in request.json:
                task["done"] = request.json["done"]

            if "title" in request.json:
                task["title"] = request.json["title"]

            return jsonify(task)

@app.route('/task/<int:id>', methods=["DELETE"])
def delete_task(id):
    for task in tasks:
        if id == task["id"]:
            tasks.remove(task)
            return jsonify({"deleted": True})
