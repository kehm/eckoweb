import createProfile from './create-profile';

describe('Call function createProfile', () => {
    describe('with a user that is not authenticated', () => {
        test('should return form data', () => {
            const profile = createProfile(false);
            expect(profile.authenticated).toBe(false);
            expect(profile.orcid).toBeUndefined();
            expect(profile.name).toBeUndefined();
            expect(profile.email).toBeUndefined();
            expect(profile.organization).toBeUndefined();
            expect(profile.role).toBeUndefined();
            expect(profile.status).toBeUndefined();
        });
    });
});
