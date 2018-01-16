// @flow

import fastdom from 'lib/fastdom-promise';

import loadEnhancers from './modules/loadEnhancers';
import { newsletterCheckboxClassName } from './consents';
import {
    wizardPageChangedEv,
    setPosition,
    getInfoObject as getWizardInfoObject,
} from './wizard';

const ERR_IDENTITY_CONSENT_WIZARD_MISSING = 'Missing wizard element';

const positions = {
    consent: 'consent',
    email: 'email',
    endcard: 'endcard',
};

const getAcceptedCheckboxes = (
    checkboxesEl: Array<HTMLLabelElement>
): Array<HTMLLabelElement> =>
    checkboxesEl.filter(
        (checkboxEl: HTMLLabelElement) =>
            checkboxEl.control instanceof HTMLInputElement &&
            checkboxEl.control.checked
    );

const getAcceptedCheckboxCount = (
    checkboxesEl: Array<HTMLLabelElement>
): number => getAcceptedCheckboxes(checkboxesEl).length;

const getEmailCheckboxes = (): Array<HTMLLabelElement> =>
    ([...document.getElementsByClassName(newsletterCheckboxClassName)]: Array<
        any
    >).filter(el => el instanceof HTMLLabelElement);

const updateCounterIndicator = (
    indicatorEl: HTMLElement,
    checkboxesEl: Array<HTMLLabelElement>
): Promise<void> =>
    fastdom.write(() => {
        indicatorEl.innerText = getAcceptedCheckboxCount(checkboxesEl).toString(
            10
        );
    });

const showOrHideBackButtonEl = (
    buttonBackEl: HTMLElement,
    position: number
) => {
    const displayButtonBack = position > 0;
    return fastdom.write(() => {
        buttonBackEl.setAttribute(
            'aria-hidden',
            (!displayButtonBack).toString()
        );
        if (displayButtonBack) {
            buttonBackEl.removeAttribute('disabled');
        } else {
            buttonBackEl.setAttribute('disabled', 'disabled');
        }
        buttonBackEl.classList.toggle(
            'identity-consent-wizard__revealable--visible',
            displayButtonBack
        );
    });
};

const showOrHideEmailCounter = (
    emailCounterEl: HTMLElement,
    positionName: string
) => {
    const displayCounter = positionName === positions.email;
    return fastdom.write(() => {
        emailCounterEl.setAttribute(
            'aria-hidden',
            (!displayCounter).toString()
        );
        emailCounterEl.classList.toggle(
            'identity-consent-wizard__revealable--visible',
            displayCounter
        );
    });
};

const bindEmailConsentCounterToWizard = (wizardEl: HTMLElement): void => {
    window.addEventListener(wizardPageChangedEv, ev => {
        if (ev.target === wizardEl) {
            fastdom
                .read(() => [
                    [
                        ...document.getElementsByClassName(
                            'identity-consent-wizard-counter'
                        ),
                    ][0],
                    [
                        ...document.getElementsByClassName(
                            'identity-consent-wizard-button-back'
                        ),
                    ][0],
                ])
                .then(([counterEl: HTMLElement, buttonBackEl: HTMLElement]) =>
                    Promise.all([
                        showOrHideBackButtonEl(
                            buttonBackEl,
                            ev.detail.position
                        ),
                        showOrHideEmailCounter(
                            counterEl,
                            ev.detail.positionName
                        ),
                    ])
                );
        }
    });
};

const showWizard = (wizardEl: HTMLElement): Promise<void> =>
    fastdom.write(() => wizardEl.classList.remove('u-h'));

const hideLoading = (loadingEl: HTMLElement): Promise<void> =>
    fastdom.write(() => loadingEl.remove());

const bindNextButton = (buttonEl: HTMLElement): void => {
    const wizardEl: ?Element = buttonEl.closest('.identity-wizard--consent');
    if (wizardEl && wizardEl instanceof HTMLElement) {
        buttonEl.addEventListener('click', (ev: Event) => {
            ev.preventDefault();
            getWizardInfoObject(wizardEl).then(wizardInfo =>
                setPosition(wizardEl, wizardInfo.position + 1)
            );
        });
    } else {
        throw new Error(ERR_IDENTITY_CONSENT_WIZARD_MISSING);
    }
};

const createEmailConsentCounter = (counterEl: HTMLElement): void => {
    const indicatorEl = document.createElement('div');
    const textEl = document.createElement('div');
    const checkboxesEl = getEmailCheckboxes();

    indicatorEl.classList.add('identity-consent-wizard-counter__indicator');
    textEl.classList.add('identity-consent-wizard-counter__text');

    updateCounterIndicator(indicatorEl, checkboxesEl);

    checkboxesEl.forEach(checkboxEl => {
        checkboxEl.addEventListener('change', () => {
            updateCounterIndicator(indicatorEl, checkboxesEl);
        });
    });
    fastdom.write(() => {
        textEl.innerHTML = `of <strong>${
            checkboxesEl.length
        }</strong> selected`;
        counterEl.append(indicatorEl);
        counterEl.append(textEl);
    });
};

const enhanceConsentWizard = (): void => {
    const loaders = [
        ['.identity-consent-wizard-counter', createEmailConsentCounter],
        ['.identity-wizard--consent', bindEmailConsentCounterToWizard],
        ['.identity-wizard--consent', showWizard],
        ['#identityWizardloadingError', hideLoading],
        ['.js-identity-consent-wizard__next', bindNextButton],
    ];
    loadEnhancers(loaders);
};

export { enhanceConsentWizard };
