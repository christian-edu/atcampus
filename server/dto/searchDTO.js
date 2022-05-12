export class SearchDTO {
    constructor(language = '', workMethod = '', gradeGoal = '', frequency = '', size = 0, subject = '', place = '', school= '', id = 0) {
        this.language = language;
        this.workMethod = workMethod;
        this.gradeGoal = gradeGoal;
        this.size = size;
        this.subject = subject;
        this.school = school;
        this.place = place;
        this.frequency = frequency;
        this.id = id;
    }
}