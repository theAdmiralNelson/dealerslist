import { createSelector } from 'reselect';
import _ from 'lodash';

const soldEntriesSelector = state => state.employees;
const soldSearchSelector = state => state.searching.search;

const getSoldEntries = (employees, search) => {

  const mappedEntries = _.map(employees, (val, uid) => {
    return { ...val, uid };
  });

  const sortMappedEntries = _.sortBy(mappedEntries, (value) => value.make);

  const searchLowerCase = search.toLowerCase();

  const soldSearchedEntries = _.filter(sortMappedEntries,
    (value) => (value.make.toLowerCase().indexOf(searchLowerCase) !== -1 ||
      value.model.toLowerCase().indexOf(searchLowerCase) !== -1)
        && value.sold === true);


  return soldSearchedEntries;
  };

export default createSelector(
  soldEntriesSelector,
  soldSearchSelector,
  getSoldEntries
);
