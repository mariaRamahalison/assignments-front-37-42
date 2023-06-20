# ASSIGNMENTS-FRONT

Ce projet est la partie front utilisé pour la gestion des assignments du TP ASSIGNMENTS 

# Getting started 
Les développeurs: 
- Randriahamihaja Ambinintsoa Maria N°42
- Ramaroson Andy Faniry N°37  

- Identifiant par défaut (identifant / mots de passe):
  - Admin : admin@gmail.com/admin
  - Etudiant :mlidden0@scribd.com/123
  - Professeur : hfolini9@123-reg.co.uk/123

- Hébergement sur render.com  : https://assignemts-front-andy-maria-37-42.onrender.com
Back: https://assignemts-api-andy-maria-37-42.onrender.com

### Setup
Pour construire et faire fonctionner l'application, vous avez besoin de

* NodeJS 
* npm

## Installation du projet:

### Step 1
```shell
npm install -g @angular/cli                                      # Installez angular CLI (en super utilisateur)
```

### Step 2
```shell
git clone https://github.com/mariaRamahalison/assignments-front-37-42.git
cd ASSIGNMENTS-API-37-42
```

### Step 3
```shell
ng serve
```

### Step 4
Allez dans votre navigateur et accéder la page au port marqué dans le terminal 

## Documentation 
Ce projet est composé :
### Page de login 
- SnackBar Material pour l'affichage des messages d'erreurs 

### Page d'inscription :
- upload photo de profil
- SnackBar Material pour l'affichage des messages d'erreurs

### Page liste des assignments correspondant au type d'utilisateur connecté:
- Material Card pour chaque assignment 

### Page detail d'un assignment :
- Matérial Dialog 

### Page création d'assignment :
- un Formulaire de type Stepper 
- MatSnackBar pour affichage d'erreur 

### Page d'édition d'assignment :
- un Formulaire de type Stepper 
- MatSnackBar pour affichage d'erreur 

### Page notation d'assignment :
- drag and drop entre la liste des Assignments non rendus et rendus ( Matérial drag and drop )

### Page Profil :
- upload photo pour changement photo de profil 
- MatSnackBar pour affichage d'erreur 

### Ajout loading à chaque chargment de donnée : 


## Element utilisé : 
- tutorial loading spinner : https://danielk.tech/home/angular-how-to-add-a-loading-spinner
- tutorial d'angular matérial : https://material.angular.io/
- template Sneat : https://demos.themeselection.com/sneat-bootstrap-html-admin-template/documentation/ 
