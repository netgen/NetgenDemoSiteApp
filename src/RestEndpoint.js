import NetgenRestClient from './NetgenRestClient';
import { restEndpointUrl } from '../ngdemoappconfig';

/*
  Expose default rest endpoint defined in configuration file.
*/
const restEndpoint = new NetgenRestClient({ endPointUrl: restEndpointUrl });

export default restEndpoint;
