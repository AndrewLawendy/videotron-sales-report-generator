import { Store } from "idb-keyval";

export const EMPLOYEE = "employee";
export const RECORDS = "records";

export const employeeStore = new Store(`${EMPLOYEE}-db`, `${EMPLOYEE}-store`);
export const recordsStore = new Store(`${RECORDS}-db`, `${RECORDS}-store`);

export const headers = [
  "Date d'appel",
  "PR",
  "Nom du conseiller",
  "(Genesys ou liste Excel)",
  "Codification de l'interaction",
  "Nombre de Produit",
  "Produit vendu",
  "Numéro de téléphone",
  "Numéro de compte Clic",
  "Numéro de compte Hélix",
  "Date d'installation ou livraison"
];
