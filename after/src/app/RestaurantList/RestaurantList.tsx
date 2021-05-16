import * as React from 'react';
import { useCallback, useState } from 'react';
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
  Select,
  SelectOption,
  Skeleton,
  TextArea,
  TextInput,
  Title,
} from '@patternfly/react-core';
import moment from 'moment';
import { TrashIcon } from '@patternfly/react-icons';
import { appI18nDefaults, appI18nDictionaries, useAppI18n } from '@app/i18n';
import { SelectDirection, SelectVariant } from '@patternfly/react-core/dist/js/components/Select/selectConstants';

interface Data {
  title: string;
  review: string;
  date: string;
  value: string;
}

export const RestaurantList: React.FunctionComponent = () => {
  const { i18n, locale, setLocale } = useAppI18n();
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [date, setDate] = useState('');
  const [value, setValue] = useState('');

  const [invalidTitle, setInvalidTitle] = useState(false);
  const [invalidReview, setInvalidReview] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidValue, setInvalidValue] = useState(false);

  const [data, setData] = useState<Map<string, Data>>(new Map<string, Data>());

  const getCurrencyValue = useCallback(
    (value: any) => new Intl.NumberFormat(locale, { style: 'currency', currency: i18n.currency }).format(value),
    [locale]
  );

  const getDate = useCallback(
    (date) => {
      const localeDate = moment(date);
      localeDate.locale(locale);
      return localeDate.format('L');
    },
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

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(appI18nDefaults.locale);
  const select = useCallback((event, selection) => {
    setIsOpen(false);
    setSelected(selection);
    setLocale(selection);
  }, []);

  return (
    <>
      <PageSection>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title headingLevel="h1" size="lg">
            {i18n.title}
          </Title>
          <div style={{ width: '100px' }}>
            <Select
              variant={SelectVariant.single}
              onToggle={setIsOpen}
              onSelect={select}
              selections={selected}
              isOpen={isOpen}
              direction={SelectDirection.down}
            >
              {Array.from(appI18nDictionaries.keys()).map((locale, index) => (
                <SelectOption key={index} value={locale} />
              ))}
            </Select>
          </div>
        </div>
      </PageSection>
      <PageSection>
        <div style={{ width: '70%' }}>
          <Form>
            <FormGroup
              label={i18n.form.name}
              isRequired
              fieldId="name"
              helperText={i18n.form.nameHelper}
              validated={invalidTitle ? 'error' : 'default'}
              helperTextInvalid={i18n.form.nameInvalidHelper}
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
              label={i18n.form.review}
              fieldId="review"
              validated={invalidReview ? 'error' : 'default'}
              helperTextInvalid={i18n.form.reviewInvalidHelper}
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
              label={i18n.form.date}
              fieldId="date"
              validated={invalidDate ? 'error' : 'default'}
              helperTextInvalid={i18n.form.dateInvalidHelper}
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
              label={i18n.form.value}
              fieldId="meal"
              validated={invalidValue ? 'error' : 'default'}
              helperTextInvalid={i18n.form.valueInvalidHelper}
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
                {i18n.form.save}
              </Button>
              <Button variant="link" onClick={cancel}>
                {i18n.form.cancel}
              </Button>
            </ActionGroup>
          </Form>
        </div>
      </PageSection>
      <Divider />
      <PageSection>
        <div style={{ marginBottom: '20px' }}>
          <Title headingLevel="h2" size="lg">
            {i18n.saved.title}
          </Title>
        </div>
        <div style={{ width: '70%' }}>
          {Array.from(data.values()).length === 0 && (
            <Card>
              <CardTitle>{i18n.saved.createYourFirst}</CardTitle>
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
                    {date !== '' && <div style={{ width: '50%' }}>{getDate(date)}</div>}
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
