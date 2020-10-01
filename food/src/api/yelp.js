import axios from 'axios';

export default axios.create({
    // tacks this onto the front of an api call
    baseURL: 'https://api.yelp.com/v3/businesses', 
    headers: {
        // 'Bearer APIkey'
        // Remove space --> ERROR shows up
        Authorization: 'Bearer wPsVQ4_zmXGmf-5mQ5wRR09mg1PFZFaU2TrRFsOnVV-zb8xB9N_DHF3-2BFWqKqiRMRwGKauq0rbGCMa8K12DP29XXZ949g_OsSZYXKlnRwxs6pf3d1o5DoezqNiX3Yx'
    }
});