import { Form } from "../../src/entities/form";
import { User } from "../../src/entities/User";
import { testGraphQLCall } from "../../src/testGraphQLCall";

const createFormMiutation = `
mutation createForm($input: FormInput!) {
    createForm(input: $input) {
      form {
        id
        createdAt
        dayRate
        weight
        symptoms {
            id
            name
            intensity
            isDangerous
        }
        stoolTypes
        sleepLenght
        sleepQuality
        mood
        stressLevel
        activities {
            id
            type
            moodAfter
            time
        }
        experiments {
            experimentId
            quantity
            productName
            generalSensation
        }
        inTherapy
        menstruation
        migraine
        pollakiuria
        notes
      }
      errors {
        fieldName
        errorId
        message
      }
    }
}`;

const dayFormQuery = `
query DayForm($date: String!) {
    dayForm(date: $date) {
      id
      createdAt
      dayRate
      weight
      symptoms {
        id
        name
        intensity
        isDangerous
      }
      stoolTypes
      sleepLenght
      sleepQuality
      mood
      stressLevel
      activities {
        id
        type
        moodAfter
        time
      }
      experiments {
        experimentId
        quantity
        productName
        generalSensation
      }
      inTherapy
      menstruation
      migraine
      pollakiuria
      notes
    }
}`;

export const formTest = () =>
  describe("form resolvers", () => {
    it("createForm mutation, dayForm query", async () => {
      const dbUser = await User.findOne({ where: { email: "ania@test.com" } });

      const testForm = {
        dayRate: 4,
        weight: 53,
        stoolTypes: [3, 5],
        sleepLenght: 8,
        sleepQuality: 5,
        mood: 5,
        stressLevel: 3,
        inTherapy: true,
        menstruation: true,
        migraine: false,
        pollakiuria: false,
        notes: "some notes",
      };

      await testGraphQLCall(
        createFormMiutation,
        {
          input: {
            dayRate: testForm.dayRate,
            weight: testForm.weight,
            stoolTypes: testForm.stoolTypes,
            sleepLenght: testForm.sleepLenght,
            sleepQuality: testForm.sleepQuality,
            mood: testForm.mood,
            stressLevel: testForm.stressLevel,
            inTherapy: testForm.inTherapy,
            menstruation: testForm.menstruation,
            migraine: testForm.migraine,
            pollakiuria: testForm.pollakiuria,
            notes: testForm.notes,
          },
        },
        dbUser!.id
      );

      const dbForm = await Form.findOne({ where: { notes: testForm.notes } });

      expect(dbForm).toBeDefined();

      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();
      const day = today.getDate();

      const date = `${year}-${month + 1}-${day}`;

      const dayFormResponse = await testGraphQLCall(
        dayFormQuery,
        {
          date: date,
        },
        dbUser!.id
      );

      expect(dayFormResponse).toEqual({
        data: {
          dayForm: {
            id: dbForm?.id,
            createdAt: dbForm?.createdAt.getTime().toString(),
            dayRate: testForm.dayRate,
            weight: testForm.weight,
            stoolTypes: testForm.stoolTypes,
            sleepLenght: testForm.sleepLenght,
            sleepQuality: testForm.sleepQuality,
            mood: testForm.mood,
            stressLevel: testForm.stressLevel,
            inTherapy: testForm.inTherapy,
            menstruation: testForm.menstruation,
            migraine: testForm.migraine,
            pollakiuria: testForm.pollakiuria,
            notes: testForm.notes,
            activities: [],
            symptoms: [],
            experiments: [],
          },
        },
      });
    });
  });
