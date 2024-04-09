import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    //console.log(JoblyApi.token);
    //console.log(process.env.REACT_APP_BASE_URL);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    //console.log(res);
    return res.company;
  }

  // obviously, you'll add a lot here ...
  static async getCompanies(name) {
    try {
      let res = await this.request("companies", { name });
      return res.companies;
    } catch (error) {
      console.error("Error getting companies:", error);
    }
  }

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    //console.log(res.job);
    return res.job;
  }

  static async getJobs(title) {
    try {
      let res = await this.request("jobs", { title });
      //console.log(res.jobs);
      return res.jobs;
    } catch (error) {
      console.error("Error getting jobs:", error);
    }
  }

  static async signup(userData) {
    try {
      let res = await this.request("auth/register", userData, "post");
      return res.token;
    } catch (error) {
      console.error("error during signup", error);
      throw error;
    }
  }

  static async login(userData) {
    try {
      let res = await this.request("auth/token", userData, "post")
      console.log(res.token, 'here');
      return res.token;
    } catch (error) {
      console.error("error during login", error);
      throw error;
    }
  }
 

}

export default JoblyApi;

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

