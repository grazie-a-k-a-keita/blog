{
  description = "blog dev shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  };

  outputs =
    { self, nixpkgs }:
    let
      system = "aarch64-darwin";
      pkgs = import nixpkgs { inherit system; };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = with pkgs; [
          nodejs_22
          pnpm_10
          biome
        ];

        shellHook = ''
          echo "blog dev shell"
          echo "  node : $(node --version)"
          echo "  pnpm : $(pnpm --version)"
        '';
      };
    };
}
