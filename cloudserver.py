import os
import threading
import datetime
import cloudstorage as gcs

from google.appengine.api import app_identity

class FileServer():
  def __init__(self):
    bucket_name = os.environ.get('BUCKET_NAME',
                                 app_identity.get_default_gcs_bucket_name())
    self.bucket = '/' + bucket_name

  def GetFileForPath(self, path):
    try:
      full_path = self.bucket + '/' + path
      file_obj = gcs.open(full_path)
      data = file_obj.read()
      file_obj.close()
      return data
    except gcs.NotFoundError:
      return None
