SOURCE_FILES=$(wildcard origin/*)
PROCESSED_FILES=$(patsubst origin/%,src/%,$(SOURCE_FILES))

all: $(PROCESSED_FILES)

src/%.tsx: origin/%.tsx
	ypp $< -o $@

src/%: origin/%
	cp -r $< $@
