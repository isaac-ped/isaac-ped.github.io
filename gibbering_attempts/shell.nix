{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.poetry

    # keep this line if you use bash
    pkgs.bashInteractive
  ];
}
