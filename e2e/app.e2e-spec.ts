import { GestionCommandeAngularPage } from './app.po';

describe('gestion-commande-angular App', () => {
  let page: GestionCommandeAngularPage;

  beforeEach(() => {
    page = new GestionCommandeAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
