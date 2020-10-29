# `ade-to-api`

## Introduction

`ade-to-api` est une interface qui analyse ADECampus et fourni une API pour accéder aux emplois du temps.

Un seul endpoint est mis à disposition, `/:rid`, avec `:rid` un identifiant de ressource. Par exemple, le `rid` du TPB de M2 GIL est `36178`.

Pour les filières autres que celles de l'Univercité Rouen Normandie, le processus doit être le même, seul l'URL de la ressource à parser diffère (à partir du moment ou c'est un emploi du temps ADE).
