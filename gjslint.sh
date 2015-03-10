FLAGS="--jslint_error=blank_lines_at_top_level \
--jslint_error=well_formed_author \
--jslint_error=no_braces_around_inherit_doc \
--jslint_error=braces_around_type \
--jslint_error=optional_type_marker \
--jslint_error=variable_arg_marker \
--jslint_error=unused_private_members \
--jslint_error=unused_local_variables \
-r"

gjslint $FLAGS public/js/
