export class GlobalConstants {

  private static readonly apiBaseUrl = 'https://api.tablon.club';
  private static readonly clubroomsPath = '/data/';
  private static readonly apiVersion = '1.1';
  static readonly titleBase = 'El Tablón de Clubhouse';

  public static readonly clubroomsEndpoints = {
    allClubs : GlobalConstants.apiBaseUrl + GlobalConstants.clubroomsPath + GlobalConstants.apiVersion + '/clubs/all',
    oneClub : GlobalConstants.apiBaseUrl + GlobalConstants.clubroomsPath + GlobalConstants.apiVersion + '/club/%s',
    allEvents : GlobalConstants.apiBaseUrl + GlobalConstants.clubroomsPath + GlobalConstants.apiVersion + '/events/all',
    oneEvent : GlobalConstants.apiBaseUrl + GlobalConstants.clubroomsPath + GlobalConstants.apiVersion + '/event/%s',
    allUsers : GlobalConstants.apiBaseUrl + GlobalConstants.clubroomsPath + GlobalConstants.apiVersion + '/users/all',
    oneUser : GlobalConstants.apiBaseUrl + GlobalConstants.clubroomsPath + GlobalConstants.apiVersion + '/user/%s',
  };

}
