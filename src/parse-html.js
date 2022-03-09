import Mercury from '@postlight/mercury-parser';

import { corsSuccessResponse, corsErrorResponse, runWarm } from './utils';

const parseHtml = async ({ body }, context, cb) => {
  const { url, html } = JSON.parse(body);
  Mercury.addExtractor(NYTimesExtractor);
  const result = await Mercury.parse(url, { html: Buffer.from(html, "utf-8") });

  return cb(
    null,
    result
      ? corsSuccessResponse(result)
      : corsErrorResponse({ message: 'There was an error parsing that URL.' })
  );
};

export default runWarm(parseHtml);
