import * as React from 'react';
import { useCallback, useMemo, useState } from 'react';
import {
  ActionGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Divider,
  Form,
  FormGroup,
  PageSection,
  Skeleton,
  TextArea,
  TextInput,
  Title,
} from '@patternfly/react-core';
import moment from 'moment';
import { TrashIcon } from '@patternfly/react-icons';

interface Data {
  title: string;
  review: string;
  date: string;
  value: string;
}

const Dashboard: React.FunctionComponent = () => {
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [date, setDate] = useState('');
  const [value, setValue] = useState('');

  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidReview, setInvalidReview] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidValue, setInvalidValue] = useState(false);

  const [data, setData] = useState<Map<string, Data>>(new Map<string, Data>());

  const locale = useMemo(() => 'en-US', []);

  const getCurrencyValue = useCallback(
    (value: any) => new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(value),
    [locale]
  );

  const save = useCallback(() => {
    if (title === '') {
      setInvalidTitle(true);
    }

    if (title !== '') {
      setData((previous) => {
        const newData = new Map(previous);
        newData.set(title, { title, review, date, value });
        return newData;
      });
    }
  }, [title, review, date, value]);

  const cancel = useCallback(() => {
    setInvalidTitle(false);
    setInvalidReview(false);
    setInvalidDate(false);
    setInvalidValue(false);

    setTitle('');
    setReview('');
    setDate('');
    setValue('');
  }, []);

  const remove = useCallback((title: string) => {
    setData((previous) => {
      const newData = new Map(previous);
      newData.delete(title);
      return newData;
    });
  }, []);

  return (
    <>
      <PageSection>
        <Title headingLevel="h1" size="lg">
          Save your restaurant experience!
        </Title>
      </PageSection>
      <PageSection>
        <div style={{ width: '70%' }}>
          <Form>
            <FormGroup
              label="Restaurant Name"
              isRequired
              fieldId="name"
              helperText="Please provide the restaurant name"
              validated={invalidTitle ? 'error' : 'default'}
              helperTextInvalid="Empty restaurant name"
            >
              <TextInput
                isRequired
                type="text"
                id="name"
                name="name"
                value={title}
                onChange={setTitle}
                validated={invalidTitle ? 'error' : 'default'}
              />
            </FormGroup>
            <FormGroup
              label="Review"
              fieldId="review"
              validated={invalidReview ? 'error' : 'default'}
              helperTextInvalid="Empty review"
            >
              <TextArea
                type="text"
                id="review"
                name="review"
                value={review}
                onChange={setReview}
                validated={invalidReview ? 'error' : 'default'}
              />
            </FormGroup>
            <FormGroup
              label="Date of visit"
              fieldId="date"
              validated={invalidDate ? 'error' : 'default'}
              helperTextInvalid="Empty date"
            >
              <TextInput
                type="text"
                id="date"
                placeholder={(moment().locale(locale).localeData() as any)._longDateFormat['L']}
                name="date"
                value={date}
                onChange={setDate}
                validated={invalidDate ? 'error' : 'default'}
              />
            </FormGroup>
            <FormGroup
              label="Value of meal"
              fieldId="meal"
              validated={invalidValue ? 'error' : 'default'}
              helperTextInvalid="Empty value"
            >
              <TextInput
                type="text"
                id="meal"
                name="meal"
                placeholder={'12312.12'}
                value={value}
                onChange={setValue}
                validated={invalidValue ? 'error' : 'default'}
              />
            </FormGroup>
            <ActionGroup>
              <Button variant="primary" onClick={save}>
                Save
              </Button>
              <Button variant="link" onClick={cancel}>
                Cancel
              </Button>
            </ActionGroup>
          </Form>
        </div>
      </PageSection>
      <Divider />
      <PageSection>
        <div style={{ marginBottom: '20px' }}>
          <Title headingLevel="h2" size="lg">
            Saved Restaurants
          </Title>
        </div>
        <div style={{ width: '70%' }}>
          {Array.from(data.values()).length === 0 && (
            <Card>
              <CardTitle>Create your first item!</CardTitle>
              <CardBody>
                <Skeleton />
              </CardBody>
              <CardFooter>
                <div style={{ display: 'flex', width: '100%' }}>
                  <div style={{ width: '50%' }}>
                    <Skeleton />
                  </div>
                  <div style={{ width: '50%' }}>
                    <Skeleton />
                  </div>
                </div>
              </CardFooter>
            </Card>
          )}
          <div>
            {Array.from(data.values()).map(({ title, review, value, date }, index) => (
              <Card key={index}>
                <CardTitle>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div>{title}</div>
                    <div>
                      <TrashIcon onClick={() => remove(title)} />
                    </div>
                  </div>
                </CardTitle>
                {review !== '' && <CardBody>{review}</CardBody>}
                <CardFooter>
                  <div style={{ display: 'flex', width: '100%' }}>
                    {value !== '' && <div style={{ width: '50%' }}>{getCurrencyValue(value)}</div>}
                    {date !== '' && <div style={{ width: '50%' }}>{date}</div>}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </PageSection>
    </>
  );
};

export { Dashboard };

/**
 * Save your restaurant experience!
 * input restaurant name
 * textinput description/review
 * date
 * value
 *
 * add / cancel
 *
 *
 *
 * card
 * title
 * review
 * date
 * value
 *
 * button remove (kebab remove)
 *
 */
