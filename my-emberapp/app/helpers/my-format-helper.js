import Ember from 'ember';

const communityPropertyTypes = [
  'beijing',
  'shanghai',
  'guangzhou'
];


export function myFormatHelper([propertyType]/*, hash*/) {
    if (communityPropertyTypes.includes(propertyType)){
        return '直辖市';
    }
    return '普通城市'
}

export default Ember.Helper.helper(myFormatHelper);
