describe('ProjectReminderCount', () => {
    let $output, projectDetail,
        ProjectReminderCount = window.c.ProjectReminderCount;

    describe('view', () => {
        beforeAll(() => {
            projectDetail = m.prop(ProjectDetailsMockery()[0]);
            let component = m.component(ProjectReminderCount, {
                    resource: projectDetail
                }),
                view = component.view(null, {
                    resource: projectDetail
                });
            $output = mq(view);
        });

        it('should render reminder total count', () => {
            expect($output.find('#project-reminder-count').length).toEqual(1);
        });
    });
});