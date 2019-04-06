export default {
    joinnames: (person: any) => `${person.first_name} ${person.last_name}`,
    yesIfTrue: (val: any) => val ? 'Yes' : '',
}