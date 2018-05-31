defmodule MeetingServerWeb.PageController do
  use MeetingServerWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
