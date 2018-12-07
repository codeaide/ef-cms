#!/bin/bash -e
docker build -t web-client-build -f ../Dockerfile.build ..
docker run --name "${CONTAINER_NAME}" web-client-build /bin/sh -c 'cd web-client && npm run test'
CODE="$?"
docker cp "${CONTAINER_NAME}:/home/app/web-client/coverage" coverage
docker rm "${CONTAINER_NAME}"
exit "${CODE}"