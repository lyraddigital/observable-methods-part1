import { ObservableMethodsPart1Page } from './app.po';

describe('observable-methods-part1 App', function() {
  let page: ObservableMethodsPart1Page;

  beforeEach(() => {
    page = new ObservableMethodsPart1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
