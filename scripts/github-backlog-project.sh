#!/usr/bin/env bash
# Crée un GitHub Project (v2) « backlog », le lie à ashhero et y ajoute les issues #1–#N.
# Prérequis : une fois, après installation de gh :
#   gh auth refresh -s project,read:project -h github.com
set -euo pipefail

OWNER="${GITHUB_OWNER:-malaminebah}"
REPO_NAME="${REPO_NAME:-ashhero}"
REPO="${OWNER}/${REPO_NAME}"
BASE_URL="https://github.com/${REPO}/issues"
TITLE="${PROJECT_TITLE:-AshHero — Backlog}"
ISSUE_COUNT="${ISSUE_COUNT:-11}"

if ! gh project list --owner "$OWNER" --limit 1 &>/dev/null; then
  echo "Le token n'a pas le scope « project ». Exécute :"
  echo "  gh auth refresh -s project,read:project -h github.com"
  echo "Puis relance ce script."
  exit 1
fi

echo "Création du projet : ${TITLE}"
PNUM=$(gh project create --owner "$OWNER" --title "$TITLE" --format json -q .number)
echo "Projet n°${PNUM} créé (owner ${OWNER})"

gh project link "$PNUM" --owner "$OWNER" -R "$REPO"
echo "Lié au dépôt ${REPO}"

for i in $(seq 1 "$ISSUE_COUNT"); do
  gh project item-add "$PNUM" --owner "$OWNER" --url "${BASE_URL}/${i}"
  echo "  + ${BASE_URL}/${i}"
done

echo ""
echo "OK. Ouvrir le board :"
echo "  gh project view ${PNUM} --owner ${OWNER} --web"
