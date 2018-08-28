#!/bin/bash

dropdb --if-exists recipe_recommendations
dropuser --if-exists recipe_recommendations_user

createdb recipe_recommendations
psql recipe_recommendations < ./db/schema.sql

psql template1 -c "create user recipe_recommendations_user;"
psql template1 -c "alter user recipe_recommendations_user password 'root';"
psql template1 -c "grant all on DATABASE recipe_recommendations to recipe_recommendations_user;"
psql recipe_recommendations -c "GRANT ALL on ALL tables IN SCHEMA public to recipe_recommendations_user"