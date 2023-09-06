FROM alpine

RUN apk add --no-cache \
    alsa-lib-dev \
    coreutils \
    g++ \
    lame-dev \
    libmad-dev \
    m4 \
    make \
    musl-dev \
    opam \
    pcre-dev \
    conf-pkg-config \
    conf-which \
    ocamlfind \
    taglib-dev \
 && adduser -D liquidsoap \
 && mkdir -p /var/{log/liquidsoap,run/liquidsoap} \
 && chown liquidsoap /var/{log/liquidsoap,run/liquidsoap}

USER liquidsoap

ENV OCAML_VERSION 4.14.1
ENV PATH /home/liquidsoap/.opam/${OCAML_VERSION}/bin:${PATH}
RUN opam init --disable-sandboxing --auto-setup \
 && opam switch create ${OCAML_VERSION} \
 && opam install --yes alsa cry lame mad taglib ssl xmlplaylist ffmpeg \
 && opam clean

ENV LS_VERSION 2.1.14
RUN opam install --yes liquidsoap.${LS_VERSION} \
 && opam clean

WORKDIR /var/lib/liquidsoap

ENTRYPOINT ["liquidsoap"]