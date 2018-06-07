import moment from 'moment';

export class DateValueConverter {
  toView(value, format = 'MMMM D, YYYY', placeholder = 'N/A') {
    const output = moment(value);

    if (!output.isValid()) {
      return placeholder;
    }

    return output.format(format);
  }
}
