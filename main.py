from flask import Flask, Response, redirect, render_template, request, url_for
from google.appengine.api import users
import os.path

import cloudserver

TEMPLATE_DIR ="template/"

app = Flask(__name__, template_folder=TEMPLATE_DIR)
app.config['DEBUG'] = True


def root_dir():  # pragma: no cover
    return os.path.abspath(os.path.dirname(__file__))


def get_file(filename):  # pragma: no cover
    try:
        src = os.path.join(root_dir(), filename)
        # Figure out how flask returns static files
        # Tried:
        # - render_template
        # - send_file
        # This should not be so non-obvious
        return open(src).read()
    except IOError as exc:
        return str(exc)


@app.route('/')
def hello():
    user = users.get_current_user()

    if not user:
      return redirect(users.create_login_url(request.url))

    return render_template("index.html", username=user.nickname())


@app.route('/files/<file_name>')
def GetFile(file_name):
  server = cloudserver.FileServer()
  data = server.GetFileForPath(file_name)
  if data is None:
    return ""
  return data


@app.route('/test')
def testroute():
    return render_template('visualization_test.html')


@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error."""
    return 'Sorry, nothing at this URL.', 404
