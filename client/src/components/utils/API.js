import axios from "axios";

export default {

    getSaved: function() {
        return axios.get("/")
    }
}