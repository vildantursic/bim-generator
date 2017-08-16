import { BimGeneratorPage } from './app.po';

describe('bim-generator App', () => {
  let page: BimGeneratorPage;

  beforeEach(() => {
    page = new BimGeneratorPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
