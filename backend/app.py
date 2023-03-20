from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.debug = True

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:#Possible02@localhost:5432/mywebapp'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    message = db.Column(db.String())

    def __init__(self, name, message):
        self.name = name
        self.message = message


@app.route('/')
def home():
    return 'Hello World!'


@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    result = []
    for post in posts:
        post_data = {}
        post_data['id'] = post.id
        post_data['name'] = post.name
        post_data['message'] = post.message
        result.append(post_data)
    return jsonify(result)


@app.route('/posts', methods=['POST'])
def create_post():
    name = request.json.get('name', '')
    message = request.json.get('message', '')
    if not name or not message:
        return jsonify({'error': 'Name or message cannot be empty!'})
    post = Post(name, message)
    db.session.add(post)
    db.session.commit()
    return jsonify({'message': 'Post created successfully!'})


if __name__ == '__main__':
    app.run()
