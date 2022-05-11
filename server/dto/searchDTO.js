export class SearchDTO {
    constructor(language = '', school = '', place = '', workMethod = '', gradeGoal = '', frequency = '') {
        this.language = language;
        this.school = school;
        this.place = place;
        this.workMethod = workMethod;
        this.gradeGoal = gradeGoal;
        this.frequency = frequency;
    }
}