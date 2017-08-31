import { AngularWeatherWidgetPage } from './app.po';

describe('angular-weather-widget App', () => {
  let page: AngularWeatherWidgetPage;

  beforeEach(() => {
    page = new AngularWeatherWidgetPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
