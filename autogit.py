import os
import sys
import time
import threading
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler


def git_pull():
    while True:
        os.system('cmd /c "git pull"')
        time.sleep(1)


def start_git_pull_thread():
    git_pull_thread = threading.Thread(target=git_pull, daemon=True)
    git_pull_thread.start()


class MyEventHandler(FileSystemEventHandler):
    DEBOUNCE_SECONDS = 1  # Adjust this value to change the debounce time

    def __init__(self):
        super().__init__()
        self.last_event_times = {}

    def should_ignore_event(self, event):
        ignored_dirs = [".git", "node_modules"]
        path_parts = event.src_path.split(os.sep)
        return event.is_directory or any(ignored in path_parts for ignored in ignored_dirs)

    def _process_event(self, event, event_type):
        if self.should_ignore_event(event):
            return

        current_time = time.time()
        last_event_time = self.last_event_times.get(event.src_path, 0)
        if current_time - last_event_time >= self.DEBOUNCE_SECONDS:
            print(f"File {event.src_path} has been {event_type}.")
            os.system('cmd /c "git commit -am "Auto Commit" && git pull && git push"')
            self.last_event_times[event.src_path] = current_time

    def on_modified(self, event):
        self._process_event(event, "modified")

    def on_created(self, event):
        self._process_event(event, "created")

    def on_deleted(self, event):
        self._process_event(event, "deleted")


def monitor_folder(path):
    event_handler = MyEventHandler()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()


if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "."
    start_git_pull_thread()
    monitor_folder(path)
