s3_sync:
	s3cmd sync ./ s3://about.eyalarubas.com --acl-public --delete-removed --exclude 'Makefile' --exclude '.git/*' --exclude '.gitignore' --exclude-from '.gitignore'