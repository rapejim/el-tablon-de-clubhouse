export class GlobalConstants {

  private static readonly apiURL = 'https://nr2.oc1.rapejim.es';
  private static readonly clubroomsPath = '/clubsrooms/api/1.0';

  public static readonly clubroomsEndpoints = {
    allClubs : GlobalConstants.apiURL + GlobalConstants.clubroomsPath + '/clubs/all',
    oneClub : GlobalConstants.apiURL + GlobalConstants.clubroomsPath + '/club/%s',
    allEvents : GlobalConstants.apiURL + GlobalConstants.clubroomsPath + '/events/all',
    oneEvent : GlobalConstants.apiURL + GlobalConstants.clubroomsPath + '/event/%s',
    allUsers : GlobalConstants.apiURL + GlobalConstants.clubroomsPath + '/users/all',
    oneUser : GlobalConstants.apiURL + GlobalConstants.clubroomsPath + '/user/%s',
  };

}
