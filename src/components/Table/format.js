import moment from "moment"

export const dateFormat = (string, format = "DD/MM/YYYY") => {
    return moment(string).format(format)
}