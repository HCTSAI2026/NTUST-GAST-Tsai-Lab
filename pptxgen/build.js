import pptxgen from 'pptxgenjs';
import { THEME } from './theme.js';

const pptx = new pptxgen();
pptx.layout = THEME.layout;
pptx.author = 'Hsieh-Chih Tsai';
pptx.subject = 'Scientific plenary presentation';
pptx.title = 'NTUST Scientific Plenary';
pptx.company = 'National Taiwan University of Science and Technology';
pptx.lang = 'en-US';
pptx.theme = {
  headFontFace: THEME.fonts.title,
  bodyFontFace: THEME.fonts.body,
  lang: 'en-US'
};

function addTitle(slide, title, subtitle) {
  slide.addText(title, {
    x: 0.48, y: 0.16, w: 10.7, h: 0.42,
    fontFace: THEME.fonts.title,
    fontSize: THEME.sizes.title,
    bold: true,
    color: THEME.colors.navy,
    margin: 0
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.50, y: 0.59, w: 9.4, h: 0.24,
      fontFace: THEME.fonts.body,
      fontSize: THEME.sizes.subtitle,
      color: THEME.colors.teal,
      margin: 0
    });
  }
}

function addSectionLabel(slide, text, x, y, w) {
  slide.addText(text, {
    x, y, w, h: 0.23,
    fontFace: THEME.fonts.body,
    fontSize: THEME.sizes.section,
    bold: true,
    color: THEME.colors.navy,
    margin: 0
  });
}

function addMetric(slide, value, label, x, y, color) {
  slide.addText(value, {
    x, y, w: 1.25, h: 0.42,
    fontSize: THEME.sizes.metric,
    bold: true,
    color,
    margin: 0
  });
  slide.addText(label, {
    x: x + 1.15, y: y + 0.02, w: 1.85, h: 0.38,
    fontSize: 10.5,
    bold: true,
    color: THEME.colors.dark,
    margin: 0
  });
}

const slide = pptx.addSlide();
slide.background = { color: THEME.colors.white };
addTitle(
  slide,
  'Radiation-Responsive CF127/HA Hydrogel for Localized GBM Therapy',
  'Chain-end engineering synchronizes local DOX release with radiotherapy'
);

addSectionLabel(slide, '01  Chain-end engineering', 0.50, 1.02, 2.6);
addSectionLabel(slide, '02  Radiation-triggered release', 3.95, 1.02, 3.0);
addSectionLabel(slide, '03  Therapeutic impact', 9.55, 1.02, 2.3);

slide.addShape(pptx.ShapeType.roundRect, {
  x: 0.48, y: 1.30, w: 3.10, h: 2.18,
  rectRadius: 0.08,
  fill: { color: THEME.colors.pale },
  line: { color: THEME.colors.line, width: 1 }
});
slide.addShape(pptx.ShapeType.roundRect, {
  x: 3.83, y: 1.30, w: 5.28, h: 2.18,
  rectRadius: 0.08,
  fill: { color: THEME.colors.pale },
  line: { color: THEME.colors.line, width: 1 }
});

addMetric(slide, '83%', 'survival beyond\n2 months', 9.58, 1.47, THEME.colors.teal);
addMetric(slide, '1.28%', 'Day-29 tumor signal\nvs untreated', 9.58, 2.25, THEME.colors.orange);

slide.addText('Treatment schedule', {
  x: 0.50, y: 3.72, w: 1.7, h: 0.22,
  fontSize: 12.3, bold: true, color: THEME.colors.navy, margin: 0
});
slide.addText('SCI evidence', {
  x: 0.50, y: 4.92, w: 1.6, h: 0.22,
  fontSize: 12.6, bold: true, color: THEME.colors.navy, margin: 0
});

slide.addImage({ path: './assets/01_CF127_chain_end_design.png', x: 0.58, y: 1.38, w: 2.90, h: 2.00 });
slide.addImage({ path: './assets/02_radiation_triggered_DOX_release.png', x: 3.95, y: 1.39, w: 5.04, h: 1.98 });
slide.addImage({ path: './assets/04_treatment_timeline.png', x: 1.20, y: 3.88, w: 10.80, h: 0.92 });
slide.addImage({ path: './assets/ivis_final.png', x: 0.48, y: 5.40, w: 6.20, h: 1.58 });
slide.addImage({ path: './assets/05_survival_curve.png', x: 6.92, y: 5.42, w: 2.55, h: 1.52 });
slide.addImage({ path: './assets/06_tumor_radiance.png', x: 9.68, y: 5.39, w: 2.90, h: 1.60 });

slide.addText('Take-home  •  Chain-end engineering converts F127 into a locally retained, radiation-responsive therapeutic depot.', {
  x: 0.50, y: 7.07, w: 9.8, h: 0.21,
  fontSize: 9.4, bold: true, color: THEME.colors.navy, margin: 0
});
slide.addText('Wu et al., Int. J. Biol. Macromol. 347 (2026) 150701', {
  x: 10.35, y: 7.07, w: 2.30, h: 0.21,
  fontSize: 6.8, color: THEME.colors.mid, align: 'right', margin: 0
});

await pptx.writeFile({ fileName: 'NTUST_plenary.pptx' });
