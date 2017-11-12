export interface IClient 
{
    id?: number,
    adresse? : String,
    cp? : String,
    email? : String,
    pays? : String,
    raisonSociale : String,
    responsable? : String,
    ville? : String
}

export interface IFournisseur 
{
    id?: number,
    adresse? : String,
    cp? : String,
    email? : String,
    pays? : String,
    raisonSociale : String,
    responsable? : String,
    ville? : String
}

export interface ICommande 
{
    id?: number,
    dateCommande? : Date,
    delaiLivraison? : Date,
    modePayement? : String,
    montantHT? : number,
    montantTTC? : number,
    numero? : String,
    refCommandeClient? : String,
    totalAchatHT? : number,
    totalAchatTTC? : number,
    client? : IClient,
}

export interface IProduit
{
    id?: number,
    delai? : Date,
    montantHT? : number,
    montantTTC? : number,
    produits? : String,
    commande? : ICommande,
    fournisseur? : IFournisseur,
}