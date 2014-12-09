from flask import Flask, redirect, render_template, request, url_for
from google.appengine.api import users

TEMPLATE_DIR ="template/"

app = Flask(__name__, template_folder=TEMPLATE_DIR)
app.config['DEBUG'] = True

@app.route('/')
def hello():
    user = users.get_current_user()

    if not user:
      return redirect(users.create_login_url(request.url))

    return render_template("index.html", username=user.nickname())

@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, nothing at this URL.', 404
