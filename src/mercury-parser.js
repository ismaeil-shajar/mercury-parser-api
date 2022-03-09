import Mercury from '@postlight/mercury-parser';

import { corsSuccessResponse, corsErrorResponse, runWarm } from './utils';
import { NYTimesExtractor } from './ny-times-extractor';

const mercuryParser = async ({ queryStringParameters }, context, cb) => {
  const { url } = queryStringParameters;
  Mercury.addExtractor(NYTimesExtractor);
  const result = await Mercury.parse(url);

  return cb(
    null,
    result
      ? corsSuccessResponse(result)
      : corsErrorResponse({ message: 'There was an error parsing that URL.' })
  );
};

export default runWarm(mercuryParser);
