import moment from "moment";

export function dateTimeToNowString(datetime: moment.Moment, withoutSuffix?: boolean): String {
    const datetimeString = moment(datetime).fromNow(withoutSuffix)
    return datetimeString.charAt(0).toUpperCase() + datetimeString.slice(1);
}
