defmodule MeetingServerWeb.PeersChannel do
  use Phoenix.Channel

  def join("peers", _message, socket) do
    {:ok, socket}
  end

  def handle_in(event, message, socket) do
    broadcast_from! socket, event, message
    {:noreply, socket}
  end
end
