defmodule MeetingServer.Mixfile do
  use Mix.Project

  def project do
    [
      app: :meeting_server,
      version: "0.0.2",
      elixir: "~> 1.10.0",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix] ++ Mix.compilers(),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {MeetingServer.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.5.5"},
      {:phoenix_pubsub, "~> 2.0.0"},
      {:phoenix_html, "~> 2.14.2"},
      {:phoenix_live_reload, "~> 1.2.4"},
      {:jason, "~> 1.2.2"},
      {:plug_cowboy, "~> 2.3.0"},
      {:plug, "~> 1.10.4"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      test: ["test"]
    ]
  end
end
