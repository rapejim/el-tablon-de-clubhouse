export class GlobalConstants {

  private static readonly apiBaseUrl = 'https://nr2.oc1.rapejim.es';
  private static readonly clubroomsPath = '/clubsrooms/api/';
  private static readonly apiVersion = '1.1';

  public static readonly clubroomsEndpoints = {
    allClubs : GlobalConstants.apiBaseUrl + GlobalConstants.clubroomsPath + GlobalConstants.apiVersion + '/clubs/all',
    oneClub : GlobalConstants.apiBaseUrl + GlobalConstants.clubroomsPath + GlobalConstants.apiVersion + '/club/%s',
    allEvents : GlobalConstants.apiBaseUrl + GlobalConstants.clubroomsPath + GlobalConstants.apiVersion + '/events/all',
    oneEvent : GlobalConstants.apiBaseUrl + GlobalConstants.clubroomsPath + GlobalConstants.apiVersion + '/event/%s',
    allUsers : GlobalConstants.apiBaseUrl + GlobalConstants.clubroomsPath + GlobalConstants.apiVersion + '/users/all',
    oneUser : GlobalConstants.apiBaseUrl + GlobalConstants.clubroomsPath + GlobalConstants.apiVersion + '/user/%s',
  };

}
